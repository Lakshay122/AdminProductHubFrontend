import React, { useEffect, useState } from "react";
import { Popconfirm, Table, Tag, Button, Avatar } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { deleteProduct, fetchAllProductByUser } from "../../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productsInfo = useSelector((state) => state.slice.data.productsInfo);
  console.log();
  const isUserProductsLoaded = useSelector(
    (state) => state.slice.loading.userProducts
  );
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };
  // Function to navigate to the edit product page
  const edit = (record) => {
    navigate(`/user/edit-product`, { state: { initialValues: record } });
  };

  // module to track whether the screen is in mobile view
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 700);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Define columns for the Product table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: isMobile ? "100%" : "20%",
      className: "title-column",
    },
    {
      title: "Image",
      dataIndex: "image",
      // width: "10%",
      render: (_, record) => {
        return <Avatar src={<img src={record?.image} alt="product image" />} />;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      // width: "100%",
    },
    {
      title: "Modified On",
      dataIndex: "updatedAt",
      // width: "100%",
      render: (_, record) => {
        return <>{dayjs(record?.updatedAt).format("DD MMM YYYY")}</>;
      },
    },

    {
      title: "Operation",
      dataIndex: "operation",
      // width: "100%",
      render: (_, record) => {
        return (
          <>
            <Button
              type="primary"
              style={{ marginRight: "10px", marginBottom: "10px" }}
              onClick={() => edit(record)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this product?"
              onConfirm={() => handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger type="primary">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  // Function to handle product deletion
  const handleDelete = async (record) => {
    await dispatch(deleteProduct(record._id));
    dispatch(
      fetchAllProductByUser({
        limit: pagination.pageSize,
        page: pagination.current,
      })
    );
  };

  // // Fetch Products on component mount
  useEffect(() => {
    dispatch(
      fetchAllProductByUser({
        limit: pagination.pageSize,
        page: pagination.current,
      })
    );
  }, [pagination.current]);

  return (
    <div className="container">
      <Button
        type="primary"
        onClick={() => navigate("/user/create-product")}
        style={{ marginBottom: 16 }}
      >
        + Create New Product
      </Button>
      {/* Table displaying Products */}
      <Table
        className="table"
        bordered
        loading={isUserProductsLoaded}
        dataSource={productsInfo.products}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: productsInfo.totalProducts,
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
      />
    </div>
  );
};

export default Home;
