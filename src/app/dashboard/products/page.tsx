"use client";
 
import { Input, Table } from "antd";
import React, { useEffect, useMemo } from "react";
import { TablePaginationConfig } from "antd/es/table";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
 
import { columns } from "./column";
 
import { useGetProductsQuery } from "@/services/product";
import { addSearchParams } from "../../../services/url"
 
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 5;
 
const Products = () => {
 
  const router = useRouter();
  const pathname = usePathname(); // next js hook to get url path
  const searchParams = useSearchParams(); // next js hook to get url search params
 
// store our url state in this variable, when it change trigger refetch to BE
  const page = parseInt(searchParams.get("page") as string) || DEFAULT_PAGE;
  const limit = parseInt(searchParams.get("limit") as string) || DEFAULT_LIMIT;
  const searchName = searchParams.get("name") || "";

  const { data, isFetching, refetch } = useGetProductsQuery({
    page,
    limit,
    filter: {
      name: searchName,
    },
  });
 
  const dataSource = useMemo(() => data?.data.products || [], [data]);
  const totalDataCount = useMemo(() => data?.data.totalCount || 0, [data]);
 
  useEffect(() => {
    // Fetch todos when the page, limit or filter changes
    refetch();
  }, [page, limit, refetch]);
 
 
// handle when table change, push to new route with new url search params
  const handleTableChange = (pagination: TablePaginationConfig) => {
    router.push(
      pathname +
        addSearchParams([
          { name: "page", value: pagination.current?.toString() },
          { name: "limit", value: pagination.pageSize?.toString() },
        ])
    );
  };
 
  return (
    <div>
      <div className="mb-6 flex items-center w-full justify-end">
        <div>
          <Input.Search
            defaultValue={searchName}
            size="large"
            placeholder="Search Product..."
            onSearch={(value) =>
              router.push(
                pathname +
                  `?page=${DEFAULT_PAGE}&limit=${DEFAULT_LIMIT}&name=${value}`
              )
            }
          />
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        pagination={{
          current: page,
          pageSize: limit,
          total: totalDataCount,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
          showTotal: (total, [num1, num2]) => {
            return `Showing: ${num1} to ${num2} from ${total} rows`;
          },
        }}
        loading={isFetching}
        onChange={handleTableChange}
      />
    </div>
  );
};
 
export default Products;