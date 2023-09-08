const config = {
    screens: {
      // Home: {
      //   path: "Home/:id",
      //   parse: {
      //     id: (id) => `${id}`,
      //   },
      // },
      // Contact: {
      //   path: "Contact",
      //   parse: {
      //     id: (id) => `${id}`,
      //   },
      // },
      Today: {
        path: "Today/:msgbody",
        parse: {
          msgbody: (msgbody) => `${msgbody}`,
          },
      },
      // Quotesdownload: {
      //   path: "Quotesdownload/:msgbody",
      //   parse: {
      //     msgbody: (msgbody) => `${msgbody}`,
      //     },
      // },
      Quotesdownload: "Quotesdownload",
      // Verses: "Verses",
    },
  };
  
  const linking = {
    prefixes: ["mybiblesong://app", 'https://mybiblesong.com'],
    config,
  };
  
  export default linking;