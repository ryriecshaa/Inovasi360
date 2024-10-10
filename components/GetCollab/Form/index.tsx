import Button from "@commons/Button";
import Filter from "@commons/Filter";
import { FilterType } from "@internal/common/type";
import { Col, Form, Input, Row, Space, Typography, Button as ButtonAntd } from "antd";
import { type } from "os";
import { useState } from "react";
import { AddCollab, GetCollabQuery } from "query/GetCollabQuery";
import styles from "./Form.module.scss";
import { category } from "@internal/story/const";


type GetCollabPropsType = {
  filters: FilterType[];
};


const GetCollab = (props: GetCollabPropsType) => {
  const { filters } = props;
  const [form] = Form.useForm();
  const [idCategory, setIdCategory] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("");

  const handleSubmit = (values: any) => {
    console.log(values)
    setName(values.name);
    setEmail(values.email);
    setDescription(values.description);
    const response = AddCollab(true, idCategory || 0, values.description, values.name, values.email);

  }

  const handleSubmitCategory = (values: any) => {
    if (idCategory === values) {
      // If the same category is clicked again, deactivate the category
      setIdCategory(null);
    } else {
      setIdCategory(values);
      setActiveCategoryId(values);
    }
  };


  return (
    <div className={styles.form}>
      <div className={styles.form__titleSection}>
        <Typography.Title level={3}>You are interested in </Typography.Title>
        <Row className={styles.form__filterContainer}>
          {filters.map((item, index) => (
            <Col key={index} className={styles.form__filter}
              onClick={() => {
                handleSubmitCategory(item.value);
              }}>
              <Filter
                isActive={item.value === activeCategoryId}
                value={item.value}
                label={item.label}
                onClick={() => {
                  handleSubmitCategory(item.value);
                }}
              />
            </Col>
          ))}
        </Row>
      </div>

      <Form size="large" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name">
          <Input placeholder="Your name" />
        </Form.Item>
        <Form.Item
          name="email">
          <Input placeholder="Your email address" />
        </Form.Item>
        <Form.Item
          name="description">
          <Input placeholder="What do you want us to tell you?" />
        </Form.Item>
        <Row gutter={[0, 36]} className={styles.form__buttonSection}>
          <Col md={8} xs={24} className={styles.form__button}>
            {/*<Button title="Send Your Question" typeButton="outline" htmlType="submit" />*/}
            <ButtonAntd type="default" shape="round" htmlType="submit" className="custom-button">
              Send Your Question
            </ButtonAntd>
          </Col>
          <Col md={12} xs={24} className={styles.form__privacyPolicy}>
            <Typography.Text className={styles.form__privacyText}>
              By sending this, you agree with our privacy policy and terms.
            </Typography.Text>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default GetCollab;
