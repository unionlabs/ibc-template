{
  description = "Unionlabs IBC Template";
  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05-small";
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
        ];
        packages.default = pkgs.hello;
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            jq
            nixfmt
            foundry-bin
            binaryen
            unixtools.xxd
            nodejs
            python3
            bun
            (rust-bin.fromRustupToolchainFile ./rust-toolchain)
          ];
          LD_LIBRARY_PATH = "${pkgs.stdenv.cc.cc.lib}/lib";
        };
      };
      imports = [ ];
      flake = { };
    };
}
