export const parse_sdgs_items = (plan_info) => {
  const weights = JSON.parse(plan_info.weight_description);
  const sdgs_items = Object.entries(weights).map(([key, value]) => {
    const title = "SDG " + (parseInt(key) + 1);
    let index = parseInt(key) + 1;
    index = ("0" + index).slice(-2);

    return { title, index, value };
  });

  return sdgs_items;
};
