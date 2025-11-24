const normalize = (value) => {
  if (!value) return "/";
  return `/${value}`.replace(/\/+/g, "/").replace(/\/$/, "") || "/";
};

const levenshtein = (a, b) => {
  const rows = b.length + 1;
  const cols = a.length + 1;
  const matrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (let i = 0; i < cols; i++) matrix[0][i] = i;
  for (let j = 0; j < rows; j++) matrix[j][0] = j;
  for (let j = 1; j < rows; j++) {
    for (let i = 1; i < cols; i++) {
      if (a[i - 1] === b[j - 1]) matrix[j][i] = matrix[j - 1][i - 1];
      else {
        matrix[j][i] =
          1 +
          Math.min(
            matrix[j - 1][i], // deletion
            matrix[j][i - 1], // insertion
            matrix[j - 1][i - 1] // substitution
          );
      }
    }
  }
  return matrix[rows - 1][cols - 1];
};

const defaultScore = (incoming, candidate) => {
  if (incoming === candidate) return 0;
  const distance = levenshtein(incoming, candidate);
  const maxLen = Math.max(incoming.length, candidate.length, 1);
  return distance / maxLen;
};

export const createFuzzyRouter = (routes, options = {}) => {
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error("createFuzzyRouter requires at least one route");
  }

  const normalized = routes
    .map((route) => normalize(route))
    .filter((route, index, arr) => arr.indexOf(route) === index);

  const threshold =
    typeof options.threshold === "number" ? options.threshold : 0.35;
  const scoreFn =
    typeof options.score === "function" ? options.score : defaultScore;

  const match = (inputPath) => {
    const incoming = normalize(inputPath);
    let winner = { score: 1, route: null };

    for (const candidate of normalized) {
      const score = scoreFn(incoming, candidate);
      if (score < winner.score) winner = { score, route: candidate };
      if (score === 0) break;
    }

    if (winner.route && winner.score <= threshold) {
      return { target: winner.route, score: winner.score };
    }

    return { target: null, score: 1 };
  };

  const resolve = (inputPath) => {
    const { target } = match(inputPath);
    if (target) return target;
    if (typeof options.onMiss === "function") {
      return options.onMiss(inputPath);
    }
    return null;
  };

  return { match, resolve, routes: [...normalized] };
};

export const fuzzyRedirect = (pathname, routes, options) => {
  const router = createFuzzyRouter(routes, options);
  return router.resolve(pathname);
};

export default createFuzzyRouter;
