import { AttributesInputObject } from "./__generated__/components";

export type ProductImageNode = {
  id: string;
  image: string;
};

export type ProductImageNodeConnection = {
  edges: {
    node?: ProductImageNode;
  }[];
};

interface SkuBaseTemplate {
  [key: string]: any;
  sku?: string;
  attributes?: {
    [key: string]: string;
  };
  basePrice?: number | string;
  salePrice?: number | string | null;
  quantity?: number | string;
  unitOfWeight?: number | string | { label: string; value: number }[];
  weight?: number | string;
  unitOfDimensions?: number | string | { label: string; value: number }[];
  height?: number | string;
  width?: number | string;
  length?: number | string;
}

export interface SkuNode extends SkuBaseTemplate {
  id: string;
  stripeId: string;
  deactivated?: Date;
  image?: string;
  basePrice: number | string;
  salePrice?: number | string | null;
  quantity: number;
  unitOfWeight: number;
  weight: number;
  unitOfDimensions: number;
  height: number;
  width: number;
  length: number;
}

export interface SkuCreationNode extends SkuBaseTemplate {
  tempId?: string;
  image?: File;
}

export type SkuNodeEdge = {
  node?: SkuNode;
};

export type SkuNodeConnection = {
  edges: SkuNodeEdge[];
};

export type ProductNode = {
  id: string;
  stripeId: string;
  name: string;
  description?: string;
  gender?: number;
  attributes?: AttributesInputObject;
  skus?: SkuNodeConnection;
  images?: ProductImageNodeConnection;
};

export type ProductNodeConnection = {
  node?: ProductNode;
};

export type RemoveSkuInputObject = {
  id?: string;
  stripeId?: string;
};

export type DeleteSkuInput = {
  domainId: string;
  skus?: RemoveSkuInputObject[];
};
