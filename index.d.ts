export interface FuzzyRouterOptions {
  threshold?: number;
  score?: (incoming: string, candidate: string) => number;
  onMiss?: (inputPath: string) => string | null | undefined;
}

export interface FuzzyMatchResult {
  target: string | null;
  score: number;
}

export interface FuzzyRouter {
  routes: string[];
  match(pathname: string): FuzzyMatchResult;
  resolve(pathname: string): string | null;
}

export declare function createFuzzyRouter(
  routes: string[],
  options?: FuzzyRouterOptions
): FuzzyRouter;

export declare function fuzzyRedirect(
  pathname: string,
  routes: string[],
  options?: FuzzyRouterOptions
): string | null;

export default createFuzzyRouter;
