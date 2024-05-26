import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import { fetchUsers } from "../../utils/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersInfo = useSelector((state) => state.slice.data.usersInfo);
  const isUserLoaded = useSelector((state) => state.slice.loading.users);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // Function to navigate to user details page
  const goToUserDetails = (record) => {
    console.log(record);
    navigate(`/admin/user/${record._id}`);
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

  // Define columns for the Users table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: isMobile ? "100%" : "20%",
      className: "title-column",
    },
    {
      title: "Email",
      dataIndex: "email",
      // width: "10%",
    },
    {
      title: "Phone",
      dataIndex: "phone_no",
      // width: "30%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "20%",
    },
    {
      title: "Login Time",
      dataIndex: "loginTime",
      // width: "10%",
      render: (_, record) => {
        return (
          <>
            {record?.loginTime
              ? dayjs(record?.loginTime).format("DD MMM YYYY HH:mm")
              : ""}
          </>
        );
      },
    },
    {
      title: "Logout Time",
      dataIndex: "logoutTime",
      // width: "10%",
      render: (_, record) => {
        return (
          <>
            {record?.logoutTime
              ? dayjs(record?.logoutTime).format("DD MMM YYYY HH:mm")
              : ""}
          </>
        );
      },
    },
  ];

  // // Fetch Usears on component mount
  useEffect(() => {
    dispatch(
      fetchUsers({ limit: pagination.pageSize, page: pagination.current })
    );
  }, [pagination.current]);

  return (
    <div className="container">
      <Button
        type="primary"
        onClick={() => navigate("/admin/create-user")}
        style={{ marginBottom: 16 }}
      >
        + Create New User
      </Button>
      {/* Table displaying Users */}
      <Table
        className="table"
        bordered
        loading={isUserLoaded}
        dataSource={usersInfo.users}
        columns={columns}
        rowClassName="editable-row"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: usersInfo.totalUsers,
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              goToUserDetails(record);
            },
          };
        }}
      />
    </div>
  );
};

export default AdminDashboard;


