function getPagination(page, limit) {
  const offset = (page - 1) * limit;
  return offset;
}

module.exports = { getPagination };
