import * as React from "react";

import { productUrl } from "..";
import Navigator from "../../components/Navigator";
import ProductImagePage from "../components/ProductImagePage";
import {
  productImageDeleteMutation,
  TypedProductImageDeleteMutation
} from "../mutations";
import { productImageQuery, TypedProductImageQuery } from "../queries";

interface ProductImageProps {
  imageId: string;
  productId: string;
}

export const ProductImage: React.StatelessComponent<ProductImageProps> = ({
  imageId,
  productId
}) => (
  <Navigator>
    {navigate => {
      const handleBack = () => navigate(productUrl(productId));
      return (
        <TypedProductImageQuery
          query={productImageQuery}
          variables={{ imageId, productId }}
        >
          {({ data, loading }) => {
            return (
              <TypedProductImageDeleteMutation
                mutation={productImageDeleteMutation}
                onCompleted={handleBack}
              >
                {mutate => {
                  const handleDelete = () =>
                    mutate({ variables: { id: imageId } });
                  const image =
                    data &&
                    data.product &&
                    data.product.image &&
                    data.product.image.edges &&
                    data.product.image.edges[0] &&
                    data.product.image.edges[0]
                      ? data.product.image.edges[0].node
                      : undefined;
                  return (
                    <ProductImagePage
                      description={image ? image.alt : null}
                      // TODO: unlock editing after API fixes
                      disabled={true}
                      image={image ? image.url : null}
                      onBack={handleBack}
                      onDelete={handleDelete}
                      onSubmit={() => {}}
                    />
                  );
                }}
              </TypedProductImageDeleteMutation>
            );
          }}
        </TypedProductImageQuery>
      );
    }}
  </Navigator>
);
export default ProductImage;