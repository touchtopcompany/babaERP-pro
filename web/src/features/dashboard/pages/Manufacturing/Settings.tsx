import React, { useState } from "react";
import {
    Card,
    Form,
    Input,
    Checkbox,
    Button,
    Typography,
    message,
    Space,
} from "antd";

const { Title } = Typography;

interface ManufacturingSettings {
    productionRefPrefix: string;
    disableEditingIngredientsQuantity: boolean;
    updatePurchasePriceBasedOnProduction: boolean;
}

const Settings: React.FC = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [settings, setSettings] = useState<ManufacturingSettings>({
        productionRefPrefix: "",
        disableEditingIngredientsQuantity: false,
        updatePurchasePriceBasedOnProduction: false,
    });

    const handleUpdateSettings = async (values: ManufacturingSettings) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSettings(values);
            message.success("Settings updated successfully!");
        } catch (error) {
            message.error("Failed to update settings. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "24px" }}>
            <Title level={3} style={{ marginBottom: "24px" }}>
                Manufacturing Settings
            </Title>

            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={settings}
                    onFinish={handleUpdateSettings}
                    style={{ maxWidth: "600px" }}
                >
                    <Form.Item
                        name="productionRefPrefix"
                        label="Production Ref No. prefix"
                        rules={[
                            {
                                required: true,
                                message: "Please enter production reference number prefix",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Production Ref No. prefix"
                            style={{ width: "100%" }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="disableEditingIngredientsQuantity"
                        valuePropName="checked"
                    >
                        <Checkbox>
                            Disable editing ingredients quantity in production
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        name="updatePurchasePriceBasedOnProduction"
                        valuePropName="checked"
                    >
                        <Checkbox>
                            Update product purchase price based on production price, on finalizing production
                        </Checkbox>
                    </Form.Item>

                    <Form.Item style={{ marginTop: "32px", textAlign: "right" }}>
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                style={{ minWidth: "100px" }}
                            >
                                Update
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Settings;