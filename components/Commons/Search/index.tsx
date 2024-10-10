// import { SearchOutlined } from "@ant-design/icons";
// import { Input } from "antd";
// import styles from "./Search.module.scss";

// type SearchPropsType = {
//   placeholder: string;
// };

// const Search = (props: SearchPropsType) => {
//   const { placeholder } = props;
//   return (
//     <Input
//       prefix={<SearchOutlined />}
//       placeholder={placeholder}
//       className={styles.search}
//     />
//   );
// };

// export default Search;
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import styles from "./Search.module.scss";

type SearchPropsType = {
  placeholder: string;
  handleSearch: (e:any) => void;
};

const Search: React.FC<SearchPropsType> = ({ placeholder, handleSearch }) => {
  return (
    <Input
      prefix={<SearchOutlined />}
      placeholder={placeholder}
      className={styles.search}
      onChange={handleSearch}
    />
  );
};

export default Search;
