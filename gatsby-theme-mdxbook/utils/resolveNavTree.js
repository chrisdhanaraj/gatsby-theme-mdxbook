// ---------------------
// If we have a SUMMARY.md, we need to resolve
// the paths that the user sent in with their
// actual final slugs
// ---------------------

exports.resolveNavTree = (sidebarTree, allMdx, rootPath = process.cwd()) => {
  const mdxByPath = allMdx.reduce((mdxByPath, { node }) => {
    mdxByPath[node.fileAbsolutePath] = node;
    return mdxByPath;
  }, {});

  const resolvedTree = sidebarTree.reduce((resolveTree, node) => {
    if (node.relativePath === '/') {
      resolveTree.push(node);
    }

    if (node.children) {
      const resolvedNode = { ...node };

      resolvedNode.children = resolvedNode.children.map(item => {
        const resolvedPath = `${rootPath}/docs/${item.relativePath}`;
        item.relativePath = mdxByPath[resolvedPath].fields.relativePath;

        return item;
      });

      resolveTree.push(resolvedNode);
    }

    return resolveTree;
  }, []);

  return resolvedTree;
};
