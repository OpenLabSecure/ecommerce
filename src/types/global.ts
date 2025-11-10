import { StorePrice } from "@medusajs/types"

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type VariantPrice = {
  calculated_price_number: number
  calculated_price: string
  original_price_number: number
  original_price: string
  currency_code: string
  price_type: string
  percentage_diff: string
}

export type StoreFreeShippingPrice = StorePrice & {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}

type ProductStatus = "draft" | "proposed" | "published" | "rejected";

interface ProductDTO {
  id: string;
  title: string;
  handle: string;
  subtitle?: string | null;
  description?: string | null;
  is_giftcard: boolean;
  status: ProductStatus;
  thumbnail?: string | null;
  width?: number | null;
  weight?: number | null;
  length?: number | null;
  height?: number | null;
  origin_country?: string | null;
  hs_code?: string | null;
  mid_code?: string | null;
  material?: string | null;
  collection?: ProductCollectionDTO | null;
  collection_id?: string | null;
  type?: ProductTypeDTO | null;
  type_id?: string | null;
  tags: ProductTagDTO[];
  variants: ProductVariantDTO[];
  options: ProductOptionDTO[];
  images: ProductImageDTO[];
  external_id?: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  categories?: ProductCategoryDTO[] | null;
  discountable?: boolean;
  metadata?: Record<string, unknown>;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  handle: string;
  rank?: number | null;
  parent_category_id?: string | null;
  parent_category?: ProductCategory | null;
  category_children: ProductCategory[];
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: Record<string, unknown> | null;
  products?: ProductDTO[]; // Puedes definir la interfaz Product según tus necesidades
  active?: boolean;
  internal?: boolean;
}

export interface ProductCategoryF {
  id: string;
  name: string;
  description: string;
  handle: string;
  rank?: number | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null; active?: boolean;
  internal?: boolean;
  category_children?: ProductCategoryF[];
  parent_category_id?: string | null;
}


interface ProductVariantDTO {
  id: string;
  title: string;
  sku?: string | null;
  barcode?: string | null;
  ean?: string | null;
  upc?: string | null;
  allow_backorder: boolean;
  manage_inventory: boolean;
  requires_shipping: boolean;
  hs_code?: string | null;
  origin_country?: string | null;
  mid_code?: string | null;
  material?: string | null;
  weight?: number | null;
  length?: number | null;
  height?: number | null;
  width?: number | null;
  options: ProductOptionValueDTO[];
  metadata?: Record<string, unknown> | null;
  product_id?: string | null;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  product?: ProductDTO | null;
  rank?: number | null;
}

interface ProductOptionDTO {
  id: string;
  title: string;
  product_id: string;
  values: ProductOptionValueDTO[];
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  metadata?: Record<string, unknown> | null;
}

interface ProductOptionValueDTO {
  id: string;
  value: string;
  option_id: string;
  variant_id: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  metadata?: Record<string, unknown> | null;
} 

interface ProductImageDTO {
  id: string;
  url: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  metadata?: Record<string, unknown> | null;
}

interface ProductTagDTO {
  id: string;
  value: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  metadata?: Record<string, unknown> | null;
}

interface ProductTypeDTO {
  id: string;
  value: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  metadata?: Record<string, unknown> | null;
}

export interface ProductCollectionDTO {
  id: string;
  title: string;
  handle: string;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  metadata?: Record<string, unknown> | null;
}

export interface ProductCollection {
  id: string;
  title: string;
  handle: string;
  created_at: string | Date;
  updated_at: string | Date;
}

interface ProductCategoryDTO {
  id: string;
  name: string;
  handle: string;
  parent_category_id?: string | null;
  rank?: number | null;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date;
  metadata?: Record<string, unknown> | null;
}

