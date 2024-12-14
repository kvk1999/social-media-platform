import productServices from "../../services/productServices";

const productsLoader = async ({ params }) => {
    try {
        // Get the page number from the URL param
        const page = params.page;
        const response = await productServices.getProducts();

        // filter the data to get the products for the current page
        const products = response.data.slice((page - 1) * 5, page * 5);

        return { products, total: response.data.length };
    } catch (error) {
        return null;
    }
}

export default productsLoader;