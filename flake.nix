{
  description = "Unionlabs IBC Template";
  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    foundry.url = "github:shazow/foundry.nix/monthly";
    rust-overlay.url = "github:oxalica/rust-overlay";
  };
  outputs = inputs@{ flake-parts, nixpkgs, foundry, rust-overlay, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems =
        [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin" ];
      perSystem = { config, self', inputs', pkgs, system, ... }: {
        _module.args.pkgs = nixpkgs.legacyPackages.${system}.appendOverlays [
          rust-overlay.overlays.default
          foundry.overlay
          (self: super: {
            solc = let
              jsoncppVersion = "1.9.3";
              jsoncppUrl =
                "https://github.com/open-source-parsers/jsoncpp/archive/${jsoncppVersion}.tar.gz";
              jsoncpp = pkgs.fetchzip {
                url = jsoncppUrl;
                sha256 = "1vbhi503rgwarf275ajfdb8vpdcbn1f7917wjkf8jghqwb1c24lq";
              };
              range3Version = "0.12.0";
              range3Url =
                "https://github.com/ericniebler/range-v3/archive/${range3Version}.tar.gz";
              range3 = pkgs.fetchzip {
                url = range3Url;
                sha256 = "sha256-bRSX91+ROqG1C3nB9HSQaKgLzOHEFy9mrD2WW3PRBWU=";
              };
              fmtlibVersion = "9.1.0";
              fmtlibUrl =
                "https://github.com/fmtlib/fmt/archive/${fmtlibVersion}.tar.gz";
              fmtlib = pkgs.fetchzip {
                url = fmtlibUrl;
                sha256 = "1mnvxqsan034d2jiqnw2yvkljl7lwvhakmj5bscwp1fpkn655bbw";
              };
            in super.solc.overrideAttrs (old:
              old // rec {
                version = "0.8.24";
                src = pkgs.fetchzip {
                  url =
                    "https://github.com/ethereum/solidity/releases/download/v${version}/solidity_${version}.tar.gz";
                  sha256 =
                    "sha256-kDHBHS0F8KmYOlXJiUCwztY3G+elfNnu1kBy3eKWx6A=";
                };
                postPatch = ''
                  substituteInPlace cmake/jsoncpp.cmake \
                    --replace "${jsoncppUrl}" ${jsoncpp}
                  substituteInPlace cmake/range-v3.cmake \
                    --replace "${range3Url}" ${range3}
                  substituteInPlace cmake/fmtlib.cmake \
                    --replace "${fmtlibUrl}" ${fmtlib}
                '';
              });
          })
        ];
        packages.default = pkgs.hello;
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nixfmt
            foundry-bin
            solc
            binaryen
            (rust-bin.fromRustupToolchainFile ./rust-toolchain)
          ];
        };
      };
      imports = [ ];
      flake = { };
    };
}
