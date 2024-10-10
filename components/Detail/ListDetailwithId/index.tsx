import styles from "./ListDetailwithId.module.scss";
import { Grid, Menu } from "antd";
import Link from "next/link";

type ListDetailwithIdType = {
  itemDetail: Array<{ id: string; name: string; }>;
  selectedKategori: string
};

const { useBreakpoint } = Grid;

const ListDetailwithId = ({ itemDetail, selectedKategori }: ListDetailwithIdType) => {
  const { sm } = useBreakpoint();
  return (
    <div className={styles.listDetailwithId}>
      <Menu
        selectedKeys={[selectedKategori]}
        mode={sm ? "horizontal" : "inline"}
        disabledOverflow>
        {itemDetail.map((item, index) => (
          <Menu.Item key={item.id}>
            <Link
              href={`/portfolio/${item.id}`}
              data-after={item.name}
              className={styles.listDetailwithId__link}>
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default ListDetailwithId;
