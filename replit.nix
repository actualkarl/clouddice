{ pkgs }: {
  deps = [
    pkgs.nodejs-20_x
    pkgs.nodePackages.typescript
    pkgs.nodePackages.typescript-language-server
    pkgs.nodePackages.ts-node
    pkgs.nodePackages.nodemon
    pkgs.nodePackages.npm
    pkgs.nodePackages.vite
  ];
}