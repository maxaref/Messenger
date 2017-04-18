export const push = url => ({
  type: 'ROUTER',
  method: 'push',
  url,
});

export const replace = url => ({
  type: 'ROUTER',
  method: 'replace',
  url,
});
