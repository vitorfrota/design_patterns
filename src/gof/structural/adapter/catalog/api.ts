
import { ProductRepositoryMemory } from "./ProductRepository";
import GetProduct from "./GetProduct";
import { ExpressAdapter, HapiAdapter } from "./HttpServer";

const httpServer = new ExpressAdapter();
//const httpServer = new HapiAdapter();
httpServer.register("get", "/products/:{productId}", async (params: any, _: any)=> {
  const productId = parseInt(params.productId);
  const productRepository = new ProductRepositoryMemory();
  const getProduct = new GetProduct(productRepository);
  const output = await getProduct.execute(productId);
  return output;
});

httpServer.listen(3001);