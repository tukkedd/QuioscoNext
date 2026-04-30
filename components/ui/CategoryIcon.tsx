import { Category } from "@/src/generated/prisma/client"
import Link from "next/link"
import Image from "next/image"

type CategoryIconsProps = {
    category: Category
}

export default function CategoryIcon({category}: CategoryIconsProps) {
  return (
    <div className={`flex items-center gap-4 w-full border-t border-gray-200 p-3 last-of-type:border-b`}>
        <div className="relative size-16">
            <Image 
                src={`/icon_${category.slug}.svg`}
                alt={`Imagen de la categoria: ${category.name}`}
                fill
            />
        </div>
        <Link 
            className="text-lg font-bold"
            href={`/order/${category.slug}`}
        >{category.name}
        </Link>
    </div>
  )
}
