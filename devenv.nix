{
  pkgs,
  inputs,
  ...
}:
let
  pkgs-unstable = import inputs.nixpkgs-unstable { system = pkgs.stdenv.system; };
in
{
  packages = with pkgs-unstable; [
    prettier
    nixd
  ];

  languages = {
    typescript.enable = true;
    javascript.enable = true;
    javascript.npm.enable = true;
    deno.enable = true;
    deno.package = pkgs-unstable.deno;
  };
}
