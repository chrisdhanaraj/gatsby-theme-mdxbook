const HTML = require('html-parse-stringify');

exports.convertHtmlToTree = htmlString => {
  console.log(htmlString);
  const tree = HTML.parse(htmlString)[0].children;

  const allPages = [];
  const sidebarTree = [
    {
      relativePath: '/',
      label: 'Home',
    },
  ];

  let currentIndex = 0;

  tree.forEach(node => {
    if (node.name === 'h2') {
      sidebarTree.push({
        header: node.children[1].content,
        children: [],
      });

      currentIndex = currentIndex + 1;
    }

    if (node.name === 'ul') {
      node.children.forEach(nodeChild => {
        const link = nodeChild.children[0];

        const el = {
          relativePath: link.attrs.href,
          label: link.children[0].content,
        };

        allPages.push(link.attrs.href);
        sidebarTree[currentIndex].children.push(el);
      });
    }
  });

  return {
    sidebarTree,
    allPages,
  };
};
