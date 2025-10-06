"use client";
import React, { use } from "react";
import { Row, Col } from "antd";
import CardTicket from "@/components/forms/CardTicket";


export default function TicketsInfoPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params);

    return (
        <Row gutter={[16, 16]} align="top" justify="center" style={{ padding: 24, maxWidth: 400, margin: '0 auto' }}>
            <Col xs={24} sm={24} md={24}>
                <CardTicket ticketId={parseInt(id, 10)} />
            </Col>
        </Row>
    );
}