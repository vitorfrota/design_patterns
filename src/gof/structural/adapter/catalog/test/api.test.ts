import axios from "axios";

//axios.defaults.validateStatus = status => status >= 200 && status <= 500;

test("Deve consultar um produto do catálogo", async function(){
    const response = await axios.get("http://localhost:3001/products/1");
    const output = response.data;
    expect(output.productId).toBe(1);
    expect(output.description).toBe("A");
    expect(output.price).toBe(100);
});