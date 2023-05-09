import React, { useState, useEffect } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import ProductH from "../../../images/product/h.png";
import Dropzone from "react-dropzone";
import SimpleBar from "simplebar-react";
import {
  Block,
  BlockHead,
  BlockTitle,
  BlockBetween,
  BlockHeadContent,
  BlockDes,
  Icon,
  Row,
  Col,
  Button,
  DataTableHead,
  DataTableBody,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
} from "../../../components/Component";
import { Card, DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge } from "reactstrap";
/* The above code is importing two variables, `productData` and `categoryOptions`, from a module/file
named "ProductData". The triple hash symbol (` */
import { productData, categoryOptions } from "./ProductData";
import { useForm } from "react-hook-form";
import { Modal, ModalBody } from "reactstrap";
import { RSelect } from "../../../components/Component";
import productService from '../../Services/products'
import categoryService from '../../Services/category'
import { toast } from "react-toastify";

const ProductList = () => {

  const [data, setData] = useState([]);
  const [sm, updateSm] = useState(false);
  const [categories, setCategory] = useState([])
  const [formData, setFormData] = useState({
    Name: "",
    Reference: "",
    Description: "",
    Price: "",
    Image: '',
    Disponibility: 'In stock',
    Category: [],
    Quantity: "",
    Color: [],
    Brand: ""
  });
  const [image, setImage] = useState(null);
  const [editId, setEditedId] = useState();
  const [view, setView] = useState({
    edit: false,
    add: false,
    details: false,
  });
  const [onSearchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  useEffect(() => {
    const fetchData = () => {
      productService.getAllProducts().then((response) => {
        setData(response.data.products);
      }).catch((error) => {
        console.log(error);
      })
    }
    fetchData()
  }, [])

  useEffect(() => {
    const getCategory = () => {
      categoryService.getAllCategory().then((response) => {
        setCategory(response.data.categories);
      }).catch((error) => {
        console.log(error);
      })
    }
    getCategory()
  }, []);


  const onFileSelect = (e) => {
    setImage(e.target.files[0])
  };
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return item.Brand.includes(onSearchText);
      });
      setData([...filteredObject]);
      console.log(data)
    } else {
      setData([...data])
    }
  }, [onSearchText]);

  const onFormCancel = () => {
    setView({ edit: false, add: false, details: false });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      Name: "",
      Reference: "",
      Description: "",
      Price: "",
      Quantity: "",
      Disponibility: 'In stock',
      Category: [],
      Color: [],
      Brand: "",
      fav: false,
      check: false,
    });
    reset({});
  };

  const onFormSubmit = async () => {
    try {
      let newFormData = new FormData()
      let tab = []
      formData.Category.map((e) => {
        tab.push(e.value)
      })
      newFormData.append('Category', tab)
      Object.keys(formData).forEach(fieldname => {
        if (fieldname !== 'Category') {
          newFormData.append(fieldname, formData[fieldname])
        }
      })
      newFormData.append('Image', image, image.name)
      const response = await productService.addProduct(newFormData);
      toast.success(response.data.message)
      setView({ open: false });
      setFiles([]);
      resetForm();
      window.location.reload()
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const onEditSubmit = async () => {
    try {
      let newFormData = new FormData()
      let tab = []
      formData.Category.map((e) => {
        tab.push(e.value)
      })
      newFormData.append('Category', tab)
      Object.keys(formData).forEach(fieldname => {
        if (fieldname !== 'Category') {
          newFormData.append(fieldname, formData[fieldname])
        }
      })

      image !== null && newFormData.append('Image', image, image.name)
      const response = await productService.editProduct(editId, newFormData);
      toast.success(response.data.message)
      setView({ open: false });
      resetForm();
      setView({ edit: false, add: false });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const onShowData = (id) => {
    data.forEach((item) => {
      if (item._id === id) {
        setFormData({
          Name: item.Name,
          ImageLink: item.ImageLink,
          Reference: item.Reference,
          Price: item.Price,
          Color: item.Color,
          Quantity: item.Quantity,
          Brand: item.Brand,
          Disponibility: item.Disponibility,
          Category: item.Category,
          Description: item.Description
        });
      }
    })
      ;
    setEditedId(id);
    setView({ add: false, edit: true });
  };

  // selects all the products
  const selectorCheck = (e) => {
    let newData;
    newData = data.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // selects one product
  const onSelectChange = (e, id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };
  const deleteProduct = async (id) => {
    try {
      const response = await productService.deleteProduct(id);
      toast.success(response.data.message)
      setTimeout(() => {
        document.location.reload();
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  // function to delete the seletected item
  const selectorDeleteProduct = () => {
    let newData;
    newData = data.filter((item) => item.check !== true);
    setData([...newData]);
  };

  const toggle = (type) => {
    setView({
      edit: type === "edit" ? true : false,
      add: type === "add" ? true : false,
      details: type === "details" ? true : false,
    });
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const { errors, register, handleSubmit, reset } = useForm();

  return (
    <React.Fragment>
      <Head title="Product List"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle>Products</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <a
                  href="#more"
                  className="btn btn-icon btn-trigger toggle-expand mr-n1"
                  onClick={(ev) => {
                    ev.preventDefault();
                    updateSm(!sm);
                  }}
                >
                  <Icon name="more-v"></Icon>
                </a>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <div className="form-control-wrap">
                        <div className="form-icon form-icon-right">
                          <Icon name="search"></Icon>
                        </div>
                        <input
                          type="search"
                          className="form-control"
                          id="default-04"
                          placeholder="Quick search by Brand"
                          onKeyUp={onFilterChange}
                        />
                      </div>
                    </li>
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle
                          color="transparent"
                          className="dropdown-toggle dropdown-indicator btn btn-outline-light btn-white"
                        >
                          Status
                        </DropdownToggle>
                        <DropdownMenu right>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>New Items</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Featured</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem tag="a" href="#dropdownitem" onClick={(ev) => ev.preventDefault()}>
                                <span>Out of Stock</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button
                        className="toggle btn-icon d-md-none"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                      </Button>
                      <Button
                        className="toggle d-none d-md-inline-flex"
                        color="primary"
                        onClick={() => {
                          toggle("add");
                        }}
                      >
                        <Icon name="plus"></Icon>
                        <span>Add Product</span>
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Card className="card-bordered">
            <div className="card-inner-group">
              <div className="card-inner p-0">
                <DataTableBody>
                  <DataTableHead>
                    <DataTableRow className="nk-tb-col-check">
                      <div className="custom-control custom-control-sm custom-checkbox notext">
                        <input
                          type="checkbox"
                          className="custom-control-input form-control"
                          id="uid_1"
                          onChange={(e) => selectorCheck(e)}
                        />
                        <label className="custom-control-label" htmlFor="uid_1"></label>
                      </div>
                    </DataTableRow>
                    <DataTableRow size="sm">
                      <span>Name</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <span>Category</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Brand</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Disponiblity</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Reference</span>
                    </DataTableRow>
                    <DataTableRow>
                      <span>Price</span>
                    </DataTableRow>
                    <DataTableRow size="md">
                      <Icon name="star-round" className="tb-asterisk"></Icon>
                    </DataTableRow>
                    <DataTableRow className="nk-tb-col-tools">
                      <ul className="nk-tb-actions gx-1 my-n1">
                        <li className="mr-n1">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              tag="a"
                              href="#toggle"
                              onClick={(ev) => ev.preventDefault()}
                              className="dropdown-toggle btn btn-icon btn-trigger"
                            >
                              <Icon name="more-h"></Icon>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <ul className="link-list-opt no-bdr">
                                <li>
                                  <DropdownItem tag="a" href="#edit" onClick={(ev) => ev.preventDefault()}>
                                    <Icon name="edit"></Icon>
                                    <span>Edit Selected</span>
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem
                                    tag="a"
                                    href="#remove"
                                    onClick={(ev) => {
                                      ev.preventDefault();
                                      selectorDeleteProduct();
                                    }}
                                  >
                                    <Icon name="trash"></Icon>
                                    <span>Remove Selected</span>
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem tag="a" href="#stock" onClick={(ev) => ev.preventDefault()}>
                                    <Icon name="bar-c"></Icon>
                                    <span>Update Stock</span>
                                  </DropdownItem>
                                </li>
                                <li>
                                  <DropdownItem tag="a" href="#price" onClick={(ev) => ev.preventDefault()}>
                                    <Icon name="invest"></Icon>
                                    <span>Update Price</span>
                                  </DropdownItem>
                                </li>
                              </ul>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </li>
                      </ul>
                    </DataTableRow>
                  </DataTableHead>
                  {currentItems.length > 0
                    ? currentItems.map((item) => {
                      return (
                        <DataTableItem key={item.id}>
                          <DataTableRow className="nk-tb-col-check">
                            <div className="custom-control custom-control-sm custom-checkbox notext">
                              <input
                                type="checkbox"
                                className="custom-control-input form-control"
                                defaultChecked={item.check}
                                id={item.id + "uid1"}
                                key={Math.random()}
                                onChange={(e) => onSelectChange(e, item.id)}
                              />
                              <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                            </div>
                          </DataTableRow>
                          <DataTableRow size="sm">
                            <span className="tb-product">
                              <img src={item.ImageLink} style={{ borderRadius: '50%', width: '100px', height: '100px' }} alt="product" className="thumb" />
                              <span className="title">{item.Name}</span>
                            </span>
                          </DataTableRow>
                          <DataTableRow size="md">
                            {item.Category && item.Category.map((e, index) => (
                              <Badge key={index} className="mr-1" color="secondary">
                                {e}
                              </Badge>
                            ))}
                          </DataTableRow>
                          <DataTableRow>
                            <span className="tb-sub">{item.Brand}</span>
                          </DataTableRow>
                          <DataTableRow>
                            <Badge className="mr-1" color="success">{item.Disponibility}</Badge>
                          </DataTableRow>
                          <DataTableRow>
                            <span className="tb-sub">{item.Reference}</span>
                          </DataTableRow>
                          <DataTableRow>
                            <Badge className="mr-1" color="info">{item.Price} D</Badge>
                          </DataTableRow>
                          <DataTableRow size="md">
                            <div className="asterisk tb-asterisk">
                              <a
                                href="#asterisk"
                                className={item.fav ? "active" : ""}
                                onClick={(ev) => ev.preventDefault()}
                              >
                                <Icon name="star" className="asterisk-off"></Icon>
                                <Icon name="star-fill" className="asterisk-on"></Icon>
                              </a>
                            </div>
                          </DataTableRow>
                          <DataTableRow className="nk-tb-col-tools">
                            <ul className="nk-tb-actions gx-1 my-n1">
                              <li className="mr-n1">
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    tag="a"
                                    href="#more"
                                    onClick={(ev) => ev.preventDefault()}
                                    className="dropdown-toggle btn btn-icon btn-trigger"
                                  >
                                    <Icon name="more-h"></Icon>
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <ul className="link-list-opt no-bdr">
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#edit"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            onShowData(item._id);
                                            toggle("edit");
                                          }}
                                        >
                                          <Icon name="edit"></Icon>
                                          <span>Edit Product</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#view"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            onShowData(item._id);
                                            toggle("details");
                                          }}
                                        >
                                          <Icon name="eye"></Icon>
                                          <span>View Product</span>
                                        </DropdownItem>
                                      </li>
                                      <li>
                                        <DropdownItem
                                          tag="a"
                                          href="#remove"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                            deleteProduct(item._id);
                                          }}
                                        >
                                          <Icon name="trash"></Icon>
                                          <span>Remove Product</span>
                                        </DropdownItem>
                                      </li>
                                    </ul>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </li>
                            </ul>
                          </DataTableRow>
                        </DataTableItem>
                      );
                    })
                    : null}
                </DataTableBody>
                <div className="card-inner">
                  {data.length > 0 ? (
                    <PaginationComponent
                      itemsPerPage={itemsPerPage}
                      totalItems={data.length}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-silent">No products found</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Block>

        <Modal isOpen={view.edit} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Product</h5>
              <div className="mt-4">
                <form noValidate onSubmit={handleSubmit(onEditSubmit)}>
                  <Row className="g-3">
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label">
                          Product Title
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="Name"
                            value={formData.Name}
                            onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                            ref={register({
                              required: "This field is required",
                            })}
                          />
                          {errors.Name && <span className="invalid">{errors.Name.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label">
                          Price
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            name="Price"
                            value={formData.Price}
                            ref={register({ required: "This is required" })}
                            className="form-control"
                            onChange={(e) => setFormData({ ...formData, Price: e.target.value })}

                          />
                          {errors.Price && <span className="invalid">{errors.Price.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label">
                          Quantity
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="number"
                            className="form-control"
                            name="Quantity"
                            // ref={register({ required: "This is required" })}
                            value={formData.Quantity}
                            onChange={(e) => setFormData({ ...formData, Quantity: e.target.value })}
                          />
                          {/* {errors.Quantity && <span className="invalid">{errors.Quantity.message}</span>} */}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label">
                          Brand
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="Brand"
                            value={formData.Brand}
                            onChange={(e) => setFormData({ ...formData, Brand: e.target.value })}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.Brand && <span className="invalid">{errors.Brand.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" >
                          Color
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="Color"
                            value={formData.Color}
                            onChange={(e) => setFormData({ ...formData, Color: e.target.value })}
                            ref={register({ required: "This is required" })}

                          />
                          {errors.Color && <span className="invalid">{errors.Color.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label">
                          Reference
                        </label>
                        <div className="form-control-wrap">
                          <input
                            type="text"
                            className="form-control"
                            name="Reference"
                            value={formData.Reference}
                            onChange={(e) => setFormData({ ...formData, Reference: e.target.value })}
                            ref={register({ required: "This is required" })}

                          />
                          {errors.Reference && <span className="invalid">{errors.Reference.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" >
                          Category
                        </label>
                        <div className="form-control-wrap">
                          <RSelect
                            name="Category"
                            isMulti
                            options={categories.map((category) => ({
                              value: category.Name,
                              label: category.Name
                            }))}
                            value={formData.Category.filter(option => option !== null && option !== undefined).map(option => ({
                              value: option,
                              label: option
                            }))}
                            onChange={(e) => {
                              setFormData({ ...formData, Category: e.map(option => option.value) });
                            }}
                            ref={register({ required: "This is required" })}
                          />
                          {errors.Category && <span className="invalid">{errors.Category.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="6">
                      <div className="form-group">
                        <label className="form-label" >
                          Product Image
                        </label>
                        <div className="form-control-wrap">
                          <img src={formData.Image} alt=""></img>
                          <input
                            type="file"
                            className="form-control"
                            name="Image"
                            onChange={onFileSelect}
                          // ref={register({
                          //   required: "This field is required",
                          // })}
                          />
                          {/* {errors.Image && <span className="invalid">{errors.Image.message}</span>} */}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <div className="form-group">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                        <div className="form-control-wrap">
                          <textarea
                            type="text"
                            className="form-control"
                            name="Description"
                            value={formData.Description}
                            onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                            ref={register({
                              required: "This field is required",
                            })}
                          />
                          {errors.Description && <span className="invalid">{errors.Description.message}</span>}
                        </div>
                      </div>
                    </Col>
                    <Col size="12">
                      <Button color="primary" type="submit">
                        <Icon className="plus"></Icon>
                        <span>Update Product</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={view.details} toggle={() => onFormCancel()} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a href="#cancel" className="close">
              {" "}
              <Icon
                name="cross-sm"
                onClick={(ev) => {
                  ev.preventDefault();
                  onFormCancel();
                }}
              ></Icon>
            </a>
            <div className="nk-modal-head">
              <h4 className="nk-modal-title title">
                Product with Reference: <small className="text-primary">#{formData.Reference}</small>
              </h4>
              <img className="mx-auto d-block" src={formData.ImageLink} alt="" style={{ maxWidth: '50%', maxHeight: '50%' }} />
            </div>
            <div className="nk-tnx-details mt-sm-3">
              <Row className="gy-3">
                <Col lg={6}>
                  <span className="sub-text">Product Name</span>
                  <Badge className="mr-1" color="light">{formData.Name}</Badge>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Product Price</span>
                  <Badge className="mr-1" color="info">{formData.Price} D</Badge>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Product Category</span>
                  <span className="caption-text">
                    {formData.Category.map((item, index) => (
                      <Badge key={index} className="mr-1" color="secondary">
                        {item}
                      </Badge>
                    ))
                    }
                  </span>
                </Col>
                <Col lg={6}>
                  <span className="sub-text">Disponibility</span>
                  <Badge className="mr-1" color="success"> {formData.Disponibility}</Badge>
                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

        <SimpleBar
          className={`nk-add-product toggle-slide toggle-slide-right toggle-screen-any ${view.add ? "content-active" : ""
            }`}
        >
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Product</BlockTitle>
              <BlockDes>
              </BlockDes>
            </BlockHeadContent>
          </BlockHead>
          <Block>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <Row className="g-3">
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" >
                      Product Title
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="Name"
                        value={formData.Name}
                        onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                        ref={register({
                          required: "This field is required",
                        })}

                      />
                      {errors.Name && <span className="invalid">{errors.Name.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" >
                      Reference
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="Reference"
                        value={formData.Reference}
                        onChange={(e) => setFormData({ ...formData, Reference: e.target.value })}
                        ref={register({ required: "This is required" })}

                      />
                      {errors.Reference && <span className="invalid">{errors.Reference.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" >
                      Brand
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="Brand"
                        value={formData.Brand}
                        onChange={(e) => setFormData({ ...formData, Brand: e.target.value })}
                        ref={register({ required: "This is required" })}

                      />
                      {errors.Brand && <span className="invalid">{errors.Brand.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">
                      Quantity
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        className="form-control"
                        name="Quantity"
                        onChange={(e) => setFormData({ ...formData, Quantity: e.target.value })}
                        ref={register({ required: "This is required" })}
                      />
                      {errors.Quantity && <span className="invalid">{errors.Quantity.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" >
                      Price
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="number"
                        name="Price"
                        value={formData.Price}
                        ref={register({ required: "This is required" })}
                        onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
                        className="form-control"

                      />
                      {errors.Price && <span className="invalid">{errors.Price.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label" >
                      Color of Product
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        className="form-control"
                        name="Color"
                        value={formData.Color}
                        onChange={(e) => setFormData({ ...formData, Color: e.target.value })}
                        ref={register({ required: "This is required" })}

                      />
                      {errors.Color && <span className="invalid">{errors.Color.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" >
                      Category
                    </label>
                    <div className="form-control-wrap">
                      <RSelect
                        name="Category"
                        value={formData.Category}
                        isMulti
                        options={categories.map((category) => ({
                          value: category.Name,
                          label: category.Name
                        }))}
                        onChange={(e) => {
                          setFormData({ ...formData, Category: e.map(option => option) });
                        }}
                        ref={register({ required: "This is required" })}
                      />
                      {errors.Category && <span className="invalid" >{errors.Category.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" >
                      Product Image
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="file"
                        className="form-control"
                        name="Image"
                        onChange={onFileSelect}
                        ref={register({
                          required: "This field is required",
                        })}

                      />
                      {errors.Image && <span className="invalid">{errors.Image.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <div className="form-group">
                    <label className="form-label" >
                      Description
                    </label>
                    <div className="form-control-wrap">
                      <textarea
                        type="text"
                        className="form-control"
                        name="Description"
                        onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                        ref={register({
                          required: "This field is required",
                        })}
                        value={formData.Description}
                      />
                      {errors.Description && <span className="invalid">{errors.Description.message}</span>}
                    </div>
                  </div>
                </Col>
                <Col size="12">
                  <Button color="primary" type="submit">
                    <Icon className="plus"></Icon>
                    <span>Add Product</span>
                  </Button>
                </Col>
              </Row>
            </form>
          </Block>
        </SimpleBar>

        {view.add && <div className="toggle-overlay" onClick={toggle}></div>}
      </Content>
    </React.Fragment >
  );
};

export default ProductList;
