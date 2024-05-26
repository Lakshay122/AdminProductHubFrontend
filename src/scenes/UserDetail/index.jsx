import React, { useEffect, useState } from "react";
import { Table, Avatar } from "antd";
import "./styles.scss";
import { fetchProductFromAdmin } from "../../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

const UserDetail = () => {
  const { id } = useParams();
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

  // Define columns for the product table
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      width: "10%",
      render: (_, record) => {
        return <Avatar src={<img src={record?.image} alt="product image" />} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      width: isMobile ? "100%" : "20%",
      className: "title-column",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "30%",
    },
    {
      title: "Modified On",
      dataIndex: "updatedAt",
      width: "10%",
      render: (_, record) => {
        return <>{dayjs(record?.updatedAt).format("DD MMM YYYY")}</>;
      },
    },
  ];

  // // Fetch products on component mount
  useEffect(() => {
    dispatch(
      fetchProductFromAdmin({
        limit: pagination.pageSize,
        page: pagination.current,
        id: id,
      })
    );
  }, [pagination.current, id]);

  return (
    <div className="container">
      {/* Table displaying products */}
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

export default UserDetail;
