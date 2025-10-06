"use client";
import React from "react";
import { Row, Col } from "antd";
import TableTickets from "@/components/TableTickets";

export default function TicketsPage() {
  return (
    <Row gutter={[16, 16]} align="top" justify="center" style={{ padding: 24, maxWidth: 1920, margin: '0 auto' }}>
      <Col xs={24} sm={24} md={24}>
        <TableTickets />
      </Col>
    </Row>
  );
}