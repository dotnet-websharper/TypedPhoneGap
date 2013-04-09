#if BOOT
open Fake
module FB = Fake.Boot
FB.Prepare {
    FB.Config.Default __SOURCE_DIRECTORY__ with
        NuGetDependencies =
            let ( ! ) x = FB.NuGetDependency.Create x
            [
                !"YUICompressor.NET"
                !"IntelliFactory.Build"
            ]
}
#else
#load ".build/boot.fsx"
open System
open System.IO
open Fake
module B = IntelliFactory.Build.CommonBuildSetup
module F = IntelliFactory.Build.FileSystem
module NG = IntelliFactory.Build.NuGetUtils

let PackageId = "TypedPhoneGap"
let Company = "IntelliFactory"
let Desc = "TypeScript wrapper and better typed bindings to Adobe PhoneGap 2.5.0"
let Url = "http://intellifactory.github.io/TypedPhoneGap/"
let Version = Version("0.0.0.0")
let VersionSuffix = Some "alpha"

let T n f = Target n f; n
let RootDir = __SOURCE_DIRECTORY__
let ( +/ ) a b = Path.Combine(a, b)

let Conf : B.BuildConfiguration =
    {
        ConfigurationName = "Release"
        Debug = false
        FrameworkVersion = B.Net45
        NuGetDependencies = new NuGet.PackageDependencySet(B.Net40.ToFrameworkName(), [])
    }

let Project : B.Project =
    let name = "TypedPhoneGap"
    {
        BuildConfigurations = [Conf]
        Name = name
        MSBuildProjectFilePath = Some (name +/ (name + ".csproj"))
    }

let Solution : B.Solution =
    {
        Metadata = B.Metadata.Create()
        Projects = [Project]
        RootDirectory = RootDir
    }

let BuildTypeScript = T "BuildTypeScript" <| fun () ->
    Solution.MSBuild()
    |> Async.RunSynchronously

let BuildDefinitions = T "BuildDefinitions" <| fun () ->
    let ok =
        shellExec {
            Program = "tsc"
            WorkingDirectory = RootDir
            CommandLine = "TypedPhoneGap/TypedPhoneGap.ts --declaration --out TypedPhoneGap"
            Args = []
        }
    tracefn "Build .d.ts: %i" ok

let ComputeVersion () =
    let fv = Version
    match NG.FindLatestOnlineVersion PackageId with
    | None -> global.NuGet.SemanticVersion.Parse(string fv)
    | Some v ->
        let b = v.Version.Build + 1
        match VersionSuffix with
        | None -> new global.NuGet.SemanticVersion(fv.Major, fv.Minor, b, "")
        | Some vn -> new global.NuGet.SemanticVersion(fv.Major, fv.Minor, b, vn)

let MinifyJavaScript = T "MinifyJavaScript" <| fun () ->
    let min = new global.Yahoo.Yui.Compressor.JavaScriptCompressor()
    !! (RootDir +/ "TypedPhoneGap" +/ "*.js")
    |> Seq.iter (fun file ->
        if file.EndsWith("min.js") |> not then
            tracefn "Minifying %s" file
            let out =
                min.Compress(File.ReadAllText file)
                |> F.TextContent
            out.WriteFile(Path.ChangeExtension(file, ".min.js")))

let BuildPackage = T "BuildPackage" <| fun () ->
    let version = ComputeVersion ()
    let content =
        use out = new MemoryStream()
        let builder = new NuGet.PackageBuilder()
        builder.Id <- PackageId
        builder.Version <- version
        builder.Authors.Add(Company) |> ignore
        builder.Owners.Add(Company) |> ignore
        builder.LicenseUrl <- Uri("http://apache.org/licenses/LICENSE-2.0.html")
        builder.ProjectUrl <- Uri(Url)
        builder.Copyright <- String.Format("Copyright (c) {0} {1}", DateTime.Now.Year, Company)
        builder.Description <- Desc
        "PhoneGap Cordova Mobile TypeScript".Split(' ')
        |> Seq.iter (builder.Tags.Add >> ignore)
        new NuGet.PackageDependencySet(B.Net40.ToFrameworkName(), [])
        |> builder.DependencySets.Add
        for ext in [".js"; ".js.map"; ".min.js"; ".ts"; ".d.ts"] do
            !! (RootDir +/ "TypedPhoneGap" +/ ("*" + ext))
            |> Seq.iter (fun file ->
                let n = Path.GetFileName(file)
                builder.Files.Add
                    (
                        let f = new NuGet.PhysicalPackageFile()
                        f.SourcePath <- file
                        f.TargetPath <- "content" +/ "Scripts" +/ n
                        f
                    ))
        builder.Save(out)
        F.Binary.FromBytes (out.ToArray())
        |> F.BinaryContent
    let out = RootDir +/ ".build" +/ String.Format("{0}.{1}.nupkg", PackageId, version)
    content.WriteFile(out)
    tracefn "Written %s" out

let Build = T "Build" ignore

BuildTypeScript ==> MinifyJavaScript ==> BuildDefinitions ==> BuildPackage ==> Build

RunTargetOrDefault Build

#endif
