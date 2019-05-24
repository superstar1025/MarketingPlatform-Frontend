import React from "react";
import classNames from "classnames";
import { FormikProps } from "formik";
import Dropzone from "react-dropzone";
import { SortableContainer, arrayMove } from "react-sortable-hoc";
import { NamespacesConsumer } from "react-i18next";
import { TranslationFunction } from "i18next";

const { UikWidget, UikWidgetHeader, UikButton } = require("../../../@uik");

import {
  CREATE_PRODUCT_IMAGE_SIZE_LIMIT,
  CREATE_PRODUCT_IMAGE_COUNT_LIMIT
} from "../../../constants/catalog";
import { createProductFormFields } from "../../../constants/formFields";
import UploadImagePrompt from "./ImageDrop/UploadImagePrompt";
import localeNamespaceKeys from "../../../constants/localization";
import FormSection from "./FormSection";
import DragAndDropThumbnail from "./ImageDrop/DragAndDropThumbnail";
import { ProductNode } from "../../../typeDefinitions/__generated__/components";

interface IProps {
  imageUploads: File[];
  formBag: FormikProps<any>;
  product?: ProductNode;
}

interface IState {
  imageCountError: boolean;
  rejectedFiles: File[] | [];
}

const SortableList = SortableContainer(({ images, deleteImage }: any) => {
  return (
    <ul>
      {images.map((image: File, index: number) => {
        return (
          <div key={index} className="image-tile">
            <div
              onClick={() => deleteImage(index)}
              className="delete-drag-item"
            >
              <i className="icofont-trash" />
            </div>
            <DragAndDropThumbnail key={index} file={image} index={index} />
          </div>
        );
      })}
    </ul>
  );
});

// TODO: Localization
class CreateProductImageDrop extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.renderDropArea = this.renderDropArea.bind(this);
  }
  state: IState = {
    imageCountError: false,
    rejectedFiles: []
  };
  deleteImage = (index: number) => {
    const images = [...this.props.imageUploads];
    images.splice(index, 1);
    this.props.formBag.setFieldValue(
      createProductFormFields.imageUploads,
      images
    );
  };
  onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    this.props.formBag.setFieldValue(
      createProductFormFields.imageUploads,
      arrayMove([...this.props.imageUploads], oldIndex, newIndex)
    );
  };
  renderDropArea(
    isDragActive: boolean,
    isDragReject: boolean,
    t: TranslationFunction<any, object, string>
  ) {
    const { imageUploads } = this.props;
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
    if (imageUploads.length && isDragReject) {
      return (
        <div>
          <div className="image-upload-thumbnails">
            <SortableList
              images={imageUploads}
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
    if (imageUploads.length && isDragActive) {
      return (
        <div>
          <div className="image-upload-thumbnails">
            <SortableList
              images={imageUploads}
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

    if (imageUploads.length === 0) {
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
            images={imageUploads}
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
              <Dropzone
                disableClick
                accept="image/*"
                multiple={true}
                maxSize={CREATE_PRODUCT_IMAGE_SIZE_LIMIT}
                onDrop={(acceptedFiles, rejectedFiles) => {
                  const { imageUploads, formBag } = this.props;
                  this.setState(
                    { imageCountError: false, rejectedFiles },
                    () => {
                      if (
                        imageUploads.length + acceptedFiles.length >
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
                        formBag.setFieldValue(
                          createProductFormFields.imageUploads,
                          [...this.props.imageUploads, ...acceptedFiles]
                        );
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
                          >
                            {t(
                              `${
                                localeNamespaceKeys.catalog.product.formLabels
                                  .images._keyPath
                              }.${
                                localeNamespaceKeys.catalog.product.formLabels
                                  .images.buttonTextUpload
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
                          {this.renderDropArea(isDragActive, isDragReject, t)}
                        </div>
                      </FormSection>
                    </UikWidget>
                  );
                }}
              </Dropzone>
            )
          );
        }}
      </NamespacesConsumer>
    );
  }
}

export default CreateProductImageDrop;
