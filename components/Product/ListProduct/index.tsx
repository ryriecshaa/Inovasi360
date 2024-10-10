import styles from "./ListProduct.module.scss";
import { Grid, Menu } from "antd";
import Link from "next/link";

type ListProductType = {
  itemProduct: string[];
};

const { useBreakpoint } = Grid;

const ListProduct = ({ itemProduct }: ListProductType) => {
  const { sm } = useBreakpoint();
  return (
    <div className={styles.listProduct}>
      <Menu
        // selectedKeys={[selectedMainMenu]}
        mode={sm ? "horizontal" : "inline"}
        disabledOverflow
      >
        {itemProduct.map((item, index) => (
          <Menu.Item key={item}>
            <Link
              href="/product"
              data-after={item}
              className={styles.listProduct__link}
            >
              <span>{item}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default ListProduct;
