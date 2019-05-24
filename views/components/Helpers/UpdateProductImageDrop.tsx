import React from "react";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { SortableContainer, arrayMove } from "react-sortable-hoc";
import { NamespacesConsumer } from "react-i18next";
import { TranslationFunction } from "i18next";

const { UikWidget, UikWidgetHeader, UikButton } = require("../../../@uik");

import {
  CREATE_PRODUCT_IMAGE_SIZE_LIMIT,
  CREATE_PRODUCT_IMAGE_COUNT_LIMIT
} from "../../../constants/catalog";
import { updateProductFormFields } from "../../../constants/formFields";
import UploadImagePrompt from "./ImageDrop/UploadImagePrompt";
import localeNamespaceKeys from "../../../constants/localization";
import FormSection from "./FormSection";
import { ProductImageNode } from "../../../typeDefinitions/catalog";
import DragAndDropThumbnail from "./ImageDrop/DragAndDropThumbnail";
import {
  UploadProductImageComponent,
  ProductNode
} from "../../../typeDefinitions/__generated__/components";
import {
  UpdateSimpleProductFormBag,
  UpdateProductFormBag
} from "../../../typeDefinitions/catalog/forms";

interface IProps {
  images: ProductImageNode[];
  formBag: UpdateSimpleProductFormBag | UpdateProductFormBag;
  product?: ProductNode;
}

interface IState {
  imageCountError: boolean;
  rejectedFiles: File[] | [];
}

const SortableList = SortableContainer(({ images, deleteImage }: any) => {
  return (
    <ul>
      {images.map((image: ProductImageNode, index: number) => {
        return (
          <div key={index} className="image-tile">
            <div
              onClick={() => deleteImage(index)}
              className="delete-drag-item"
            >
              <i className="icofont-trash" />
            </div>
            <DragAndDropThumbnail key={index} url={image.image} index={index} />
          </div>
        );
      })}
    </ul>
  );
});

// TODO: Localization
class UpdateProductImageDrop extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.renderDropArea = this.renderDropArea.bind(this);
  }
  state: IState = {
    imageCountError: false,
    rejectedFiles: []
  };
  deleteImage = (index: number) => {
    const images = [...this.props.images];
    images.splice(index, 1);
    this.props.formBag.setFieldValue(updateProductFormFields.images, images);
  };
  onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    this.props.formBag.setFieldValue(
      "images",
      arrayMove([...this.props.images], oldIndex, newIndex)
    );
  };
  renderDropArea(
    isDragActive: boolean,
    isDragReject: boolean,
    t: TranslationFunction<any, object, string>
  ) {
    const { images } = this.props;
    const imageCountError = this.state.imageCountError && (
      <div className="error-message">
        We limit products to {CREATE_PRODUCT_IMAGE_COUNT_LIMIT} images.
      </div>
    );
    const imageSizeErrorFiles = [...this.state.rejectedFiles]
      .filter(file => file.size > CREATE_PRODUCT_IMAGE_SIZE_LIMIT)
      .map((file, index) => {
        if (index !== this.state.rejectedFiles.length - 1) {
          return <span key={index}>{file.name}, </span>;
        }
        return <span key={index}>{file.name}.</span>;
      });
    const imageSizeError = imageSizeErrorFiles.length ? (
      <div className="error-message">
        These images are greater than {CREATE_PRODUCT_IMAGE_SIZE_LIMIT / 1000}{" "}
        KB: {imageSizeErrorFiles}
      </div>
    ) : null;
    if (images.length && isDragReject) {
      return (
        <div>
          <div className="image-upload-thumbnails">
            <SortableList
              images={images}
              onSortEnd={this.onSortEnd}
              deleteImage={this.deleteImage}
              axis="xy"
            />
          </div>
          <p>Only image files can be uploaded</p>
          {imageCountError}
          {imageSizeError}
        </div>
      );
    }
    if (images.length && isDragActive) {
      return (
        <div>
          <div className="image-upload-thumbnails">
            <SortableList
              images={images}
              onSortEnd={this.onSortEnd}
              deleteImage={this.deleteImage}
              axis="xy"
            />
          </div>
          <p>Drop here</p>
        </div>
      );
    }
    if (isDragReject) {
      return (
        <UploadImagePrompt>
          <p>Only image files can be uploaded</p>
        </UploadImagePrompt>
      );
    }

    if (isDragActive) {
      return (
        <UploadImagePrompt>
          <p>Drop here</p>
        </UploadImagePrompt>
      );
    }

    if (images.length === 0) {
      return (
        <UploadImagePrompt>
          <p>
            {t(
              `${
                localeNamespaceKeys.catalog.product.formLabels.images._keyPath
              }.${
                localeNamespaceKeys.catalog.product.formLabels.images.noImages
              }`
            )}
          </p>
          {imageCountError}
          {imageSizeError}
        </UploadImagePrompt>
      );
    }
    return (
      <div>
        <div className="image-upload-thumbnails">
          <SortableList
            images={images}
            onSortEnd={this.onSortEnd}
            deleteImage={this.deleteImage}
            axis="xy"
          />
        </div>
        {imageCountError}
        {imageSizeError}
      </div>
    );
  }

  render() {
    const { product } = this.props;
    return (
      <NamespacesConsumer
        ns={[
          localeNamespaceKeys.catalog._name,
          localeNamespaceKeys.formValidation._name
        ]}
      >
        {(t, { ready }) => {
          return (
            ready && (
              <UploadProductImageComponent>
                {(uploadProductImage, uploadResult) => (
                  <Dropzone
                    disableClick
                    accept="image/*"
                    multiple={true}
                    maxSize={CREATE_PRODUCT_IMAGE_SIZE_LIMIT}
                    onDrop={async (acceptedFiles, rejectedFiles) => {
                      const { images, formBag } = this.props;
                      this.setState(
                        { imageCountError: false, rejectedFiles },
                        async () => {
                          if (
                            images.length + acceptedFiles.length >
                            CREATE_PRODUCT_IMAGE_COUNT_LIMIT
                          ) {
                            this.setState({ imageCountError: true });
                            return;
                          }
                          // do nothing if no files
                          if (!acceptedFiles.length) {
                            return;
                          }
                          // on drop we add to the existing files
                          if (acceptedFiles.length) {
                            const imageLinks = images.map(image => {
                              return { id: image.id };
                            });
                            const imageUploads = acceptedFiles.map(file => ({
                              image: file
                            }));
                            const newImages = [...imageLinks, ...imageUploads];

                            try {
                              const upload = await uploadProductImage({
                                variables: {
                                  domainId:
                                    (product && product.domain.id) || "",
                                  productId: (product && product.id) || "",
                                  images: newImages
                                }
                              });
                              const edges =
                                upload &&
                                upload.data &&
                                upload.data.uploadProductImage &&
                                upload.data.uploadProductImage.product &&
                                upload.data.uploadProductImage.product.images &&
                                upload.data.uploadProductImage.product.images
                                  .edges;

                              const returnedImages =
                                edges && edges.map(image => image.node);

                              formBag.setFieldValue(
                                updateProductFormFields.images,
                                returnedImages
                              );
                            } catch (error) {}
                          }
                        }
                      );
                    }}
                  >
                    {({
                      isDragActive,
                      isDragReject,
                      getRootProps,
                      getInputProps,
                      open
                    }) => {
                      return (
                        <UikWidget>
                          <UikWidgetHeader
                            rightEl={
                              <UikButton
                                primary
                                icon={<i className="icofont-cloudapp" />}
                                onClick={() => open()}
                                isLoading={uploadResult.loading}
                              >
                                {t(
                                  `${
                                    localeNamespaceKeys.catalog.product
                                      .formLabels.images._keyPath
                                  }.${
                                    localeNamespaceKeys.catalog.product
                                      .formLabels.images.buttonTextUpload
                                  }`
                                )}
                              </UikButton>
                            }
                          >
                            {t(
                              `${
                                localeNamespaceKeys.catalog.product.formLabels
                                  .images._keyPath
                              }.${
                                localeNamespaceKeys.catalog.product.formLabels
                                  .images.sectionHeader
                              }`
                            )}
                          </UikWidgetHeader>

                          <FormSection>
                            <div
                              {...getRootProps()}
                              className={classNames("dropzone", {
                                "dropzone--isActive": isDragActive,
                                "drop-cursor": isDragActive,
                                "no-drop-cursor": isDragReject
                              })}
                            >
                              <input {...getInputProps()} />
                              {this.renderDropArea(
                                isDragActive,
                                isDragReject,
                                t
                              )}
                            </div>
                          </FormSection>
                        </UikWidget>
                      );
                    }}
                  </Dropzone>
                )}
              </UploadProductImageComponent>
            )
          );
        }}
      </NamespacesConsumer>
    );
  }
}

export default UpdateProductImageDrop;
