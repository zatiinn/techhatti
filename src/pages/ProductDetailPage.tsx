// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { Star, ShoppingCart, ThumbsUp, ThumbsDown } from 'lucide-react'

// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import useStore from "@/hooks/usetStore"
// import useCartStore from "@/hooks/cartStore"

// export default function ProductDetailPage() {
//   const { productId } = useParams()
//   const { products, isLoading, error } = useStore()
//   const { addToCart } = useCartStore()
//   const [product, setProduct] = useState(null)

//   useEffect(() => {
//     if (products.length > 0 && productId) {
//       const foundProduct = products.find(p => p.id === productId)
//       setProduct(foundProduct || null)
//     }
//   }, [products, productId])

//   if (isLoading) {
//     return <div>Loading...</div>
//   }

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   if (!product) {
//     return <div>Product not found</div>
//   }

//   const handleAddToCart = () => {
//     addToCart(product)
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid md:grid-cols-2 gap-8">
//         <div>
//           <img
//             src={product.imageUrl || '/placeholder.svg?height=400&width=400'}
//             alt={product.name}
//             className="rounded-lg shadow-lg w-full h-auto"
//           />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
//           <div className="flex items-center mb-4">
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
//               ))}
//             </div>
//             <span className="ml-2 text-gray-600">{(product.rating || 0).toFixed(1)}</span>
//           </div>
//           <p className="text-gray-600 mb-4">{product.description}</p>
//           <div className="text-3xl font-bold mb-4">₹{product.price.toFixed(2)}</div>
//           <Button className="w-full mb-4" onClick={handleAddToCart}>
//             <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
//           </Button>
//           <Separator className="my-6" />
//           <h2 className="text-xl font-semibold mb-2">Technical Specifications</h2>
//           <ul className="space-y-2">
//             {product.specs && product.specs.map((spec, index) => (
//               <li key={index} className="flex justify-between">
//                 <span className="font-medium">{spec.name}:</span>
//                 <span>{spec.value}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       {/* ... (rest of the component remains the same) */}
//     </div>
//   )
// }