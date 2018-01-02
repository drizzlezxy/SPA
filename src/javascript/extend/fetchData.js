const fetchData = (type) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        list: [
          { 'value': '330101', 'label': '市辖区' },
          { 'value': '330102', 'label': '上城区' },
          { 'value': '330103', 'label': '下城区' },
          { 'value': '330104', 'label': '江干区' },
          { 'value': '330105', 'label': '拱墅区' },
          { 'value': '330106', 'label': '西湖区' },
          { 'value': '330108', 'label': '滨江区' },
          { 'value': '330109', 'label': '萧山区' },
          { 'value': '330110', 'label': '余杭区' },
          { 'value': '330122', 'label': '桐庐县' },
          { 'value': '330127', 'label': '淳安县' },
          { 'value': '330182', 'label': '建德市' },
          { 'value': '330183', 'label': '富阳市' },
          { 'value': '330185', 'label': '临安市' },
        ],
        words: `A dog is a type of domesticated animal. 
          Known for its loyalty and faithfulness, 
          it can be found as a welcome guest in many households across the world.`,
      };
      resolve(data[type || 'list'] || data.list);
    }, Math.random() * 500 + 1000);
  });
};

export default fetchData;
