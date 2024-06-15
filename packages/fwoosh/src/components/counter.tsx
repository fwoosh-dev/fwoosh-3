import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: "rgb(60,60,60)",
    background: "green",
  },
});

export const Counter = () => {
  return (
    <section className="border-blue-400 -mx-4 mt-4 rounded border border-dashed p-4">
      <button {...stylex.props(styles.base)}>Increment</button>
    </section>
  );
};
