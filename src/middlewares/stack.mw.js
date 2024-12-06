export const StackLogger = (router) => {
  console.clear();

  console.log("Initialize stack".cyan);

  router.stack.map(({ route }) => {
    console.log(
      `[${route.stack[0].method}]`.toUpperCase().yellow.bold +
        `/api${route.path}`.green +
        ` ${route.stack[0].name}`.magenta
    );
  });
};
