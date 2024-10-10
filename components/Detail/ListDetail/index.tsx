import styles from "./ListDetail.module.scss";
import { Grid, Menu } from "antd";
import Link from "next/link";

type ListDetailType = {
  itemDetail: string[];
  selectedKategori: string
};

const { useBreakpoint } = Grid;

const ListDetail = ({ itemDetail, selectedKategori }: ListDetailType) => {
  const { sm } = useBreakpoint();
  return (
    <div className={styles.listDetail}>
      <Menu
        selectedKeys={[selectedKategori]}
        mode={sm ? "horizontal" : "inline"}
        disabledOverflow>
        {itemDetail.map((item, index) => (
          <Menu.Item key={item.split(" ").join("")}>
            <Link
              href={`/product/${(item == null ? item : item.split(" ").join(""))}`}
              data-after={item}
              className={styles.listDetail__link}>
              <span>{item}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default ListDetail;
