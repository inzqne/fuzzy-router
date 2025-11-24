declare module "next/server" {
  export interface NextRequest {
    nextUrl: {
      pathname: string;
      clone(): URL;
    };
  }

  export class NextResponse {
    static redirect(url: URL): NextResponse;
    static next(): NextResponse;
  }
}
