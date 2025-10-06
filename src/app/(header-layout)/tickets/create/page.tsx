"use client";
import React from "react";
import { Row, Col } from "antd";
import FormTicket from "@/components/forms/FormTicket";

export default function CreateTicketsPage() {
  return (
    <Row gutter={[16, 16]} align="top" justify="center" style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
      <Col xs={24} sm={24} md={24}>
        <FormTicket />
      </Col>
    </Row>
  );
}