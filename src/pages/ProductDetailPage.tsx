import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "@/hooks/usetStore";
import { Product } from "@/lib/Types";
import useCartStore from "@/hooks/cartStore";
import toast from "react-hot-toast";
import { auth } from "@/lib/Firebase";
import { useState } from "react";

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const { products } = useStore();
  const product = products?.find((item) => item.id === productId);
  const navigate = useNavigate();

  const { addToCart } = useCartStore();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  if (!product) {
    return null;
  }

  const handleAddToCart = async (product: Product) => {
    if (!auth.currentUser) {
      toast.error("Please login to add items to cart");
      navigate("/auth");
      return;
    }

    try {
      setAddingToCart(product.id);
      await addToCart(product);
      toast.success(`Added ${product.name} to cart`, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes("stock") && retryCount < 3) {
        setTimeout(() => handleAddToCart(product), 1000);
        return;
      }
      toast.error(errorMessage || "Failed to add to cart");
    } finally {
      setAddingToCart(null);
      setRetryCount(0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-lg shadow-lg w-full max-h-[600px] object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="text-3xl font-bold mb-4">₹{product.price}</div>
          <Button
            className="w-full mb-4"
            onClick={() => handleAddToCart(product)}
            disabled={addingToCart === product.id || product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Separator className="my-6" />
          <h2 className="text-xl font-semibold mb-2">
            Technical Specifications
          </h2>
          <p>{product.description}</p>
        </div>
      </div>
      <Separator className="my-8" />
      <div>
        <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((similarProduct) => (
            <Card key={similarProduct.id}>
              <CardContent className="p-4 cursor-pointer">
                <img
                  src={similarProduct.imageUrl}
                  alt={similarProduct.name}
                  className="rounded-lg mb-2 w-full h-auto"
                  onClick={() => {
                    navigate(`/products/${similarProduct.id}`);
                  }}
                />
                <h3 className="font-semibold mb-1">{similarProduct.name}</h3>
                <div className="text-sm text-gray-600">
                  ₹{similarProduct.price}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
