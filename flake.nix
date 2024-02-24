{
  description = "Unionlabs IBC Template";
  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    foundry.url = "github:shazow/foundry.nix/monthly";
  };
  outputs = inputs@{ flake-parts, foundry, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems =
        [ "x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin" ];
      perSystem = { config, self', inputs', system, ... }: {
        _module.args.pkgs = import inputs'.nixpkgs {
          inherit system;
          overlays = [ foundry.overlays.default ];
        };
      };
      imports = [
        ({ ... }: {
          perSystem = { pkgs, ... }: {
            packages.default = pkgs.hello;
            devShells.default =
              pkgs.mkShell { buildInputs = with pkgs; []; };
          };
        })
      ];
      flake = { };
    };
}
