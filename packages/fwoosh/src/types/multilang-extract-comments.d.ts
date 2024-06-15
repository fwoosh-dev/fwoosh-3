declare module "multilang-extract-comments" {
  function extractComments(code: string): Record<
    string,
    {
      content: string;
      code: string;
    }
  >;
  export default extractComments;
}
