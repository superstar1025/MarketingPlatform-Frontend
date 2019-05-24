import { getProductAttributeModelFromSkus } from "../catalog";
import { mockSkus } from "../../mocks/catalog";

describe(`${getProductAttributeModelFromSkus.name}`, () => {
  it("should reduce skus list to dictionary of unique keys and a list of unique values for each key", () => {
    const attributes = getProductAttributeModelFromSkus(mockSkus);
    const result = {
      attributes: ["color", "size"],
      attributeValues: [["red", "blue"], ["s", "m", "l", "xl"]]
    };
    expect(attributes).toEqual(result);
  });
});
