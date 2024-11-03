import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartItem, Category, Product } from "@/lib/Types";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import useCartStore from "@/hooks/cartStore";
import useStore from "@/hooks/usetStore";
import { auth } from "@/lib/Firebase";

const ProductCatalog = () => {
  const navigate = useNavigate();
  const {
    categories,
    products,
    isLoading,
    error,
  } = useStore();

  // Cart store
  const { items: cartItems, addToCart, error: cartError } = useCartStore();

  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCat, setSelectedCat] = useState<Category | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (categories?.length > 0) {
      setSelectedCat((prevCat) => prevCat || categories[0]);
    }
  }, [categories, isLoading]);

  const categoryProducts = selectedCat
    ? products.filter(
        (product: Product) => product.categoryId === selectedCat.id
      )
    : [];

  const sortProducts = (products: Product[]) => {
    switch (sortBy) {
      case "price-low-high":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high-low":
        return [...products].sort((a, b) => b.price - a.price);
      case "stock-high-low":
        return [...products].sort((a, b) => b.stock - a.stock);
      case "stock-low-high":
        return [...products].sort((a, b) => a.stock - b.stock);
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(categoryProducts);

  const getItemInCart = (productId: string): CartItem | undefined => {
    return cartItems.find((item) => item.productId === productId);
  };

  const handleAddToCart = async (product: Product) => {
    if (!auth.currentUser) {
      toast.error("Please login to add items to cart");
      navigate("/auth", {
        state: { from: `/category/${selectedCat?.id}` },
      });
      return;
    }

    try {
      setAddingToCart(product.id);
      await addToCart(product);
      toast.success(`Added ${product.name} to cart`);
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes("stock") && retryCount < 3) {
        setRetryCount((prev) => prev + 1);
        setTimeout(() => handleAddToCart(product), 1000);
        return;
      }
      toast.error(errorMessage || "Failed to add to cart");
    } finally {
      setAddingToCart(null);
      setRetryCount(0);
    }
  };

  if (isLoading || !selectedCat) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || cartError) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || cartError}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block md:w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="space-y-1">
              {categories.map((cat: Category) => (
                <TooltipProvider key={cat.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => {
                          setSelectedCat(cat);
                        }}
                        className={cn(
                          "block w-full px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors",
                          cat.id === selectedCat?.id
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-primary"
                        )}
                      >
                        {cat.name}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{cat.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col gap-4 mb-6">
              {/* Header and Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-primary">
                    {selectedCat.name}
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {selectedCat.description}
                  </p>
                </div>
              </div>
              {/* Mobile Category Dropdown */}
              <div className="flex items-center gap-3 w-full md:justify-end">
                <div className="md:hidden w-full">
                  <Select
                    value={selectedCat?.id}
                    onValueChange={(value) => {
                      const category = categories.find(
                        (cat) => cat.id === value
                      );
                      if (category) setSelectedCat(category);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Category">
                        {selectedCat?.name}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat: Category) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low-high">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high-low">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="stock-high-low">
                      Stock: High to Low
                    </SelectItem>
                    <SelectItem value="stock-low-high">
                      Stock: Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortedProducts.length === 0 ? (
              <Alert>
                <AlertTitle>No Products Found</AlertTitle>
                <AlertDescription>
                  There are no products available in this category at the
                  moment.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedProducts.map((product) => {
                  const cartItem = getItemInCart(product.id);

                  return (
                    <Card key={product.id} className="relative">
                      <CardHeader className="p-0">
                        <div className="w-full overflow-hidden rounded-t-lg bg-gray-200">
                          <img
                            alt={product.name}
                            className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
                            src={product.imageUrl}
                            style={{
                              aspectRatio: "400/400",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </CardHeader>

                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-lg line-clamp-1">
                            {product.name}
                          </CardTitle>
                        </div>

                        <CardDescription className="line-clamp-2 mb-4">
                          {product.description}
                        </CardDescription>

                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {cartItem && (
                            <Badge variant="outline">
                              In Cart: {cartItem.quantity}
                            </Badge>
                          )}
                        </div>
                      </CardContent>

                      <CardFooter className="p-4 pt-0">
                        <Button
                          className="w-full"
                          variant={product.stock === 0 ? "outline" : "default"}
                          onClick={() => handleAddToCart(product)}
                          disabled={
                            addingToCart === product.id ||
                            product.stock === 0 ||
                            (cartItem?.quantity ?? 0) >= product.stock
                          }
                        >
                          {addingToCart === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          ) : (
                            <ShoppingCart className="h-4 w-4 mr-2" />
                          )}
                          {product.stock === 0
                            ? "Out of Stock"
                            : cartItem && cartItem.quantity >= product.stock
                            ? "Max Stock Reached"
                            : "Add to Cart"}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
