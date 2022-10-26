import axios from "axios";

var getUser = () => {
  if (localStorage.user) {
    return JSON.parse(localStorage.user);
  } else {
    return null;
  }
}

export const getBookShelf = async () => {
  let user = getUser();
  let localBookShelf = JSON.parse(localStorage.bookshelf);
  if (user) {
    let netBookShelf = await getNetBookShelf(user.id);
    localBookShelf = netBookShelf;
    localStorage.bookshelf = JSON.stringify(localBookShelf);
    // updataNetBookshelf(user.id);
    return localBookShelf
  }
  return localBookShelf;
}

var getNetBookShelf = (userId) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/querybookshelf", {
        id: userId,
      })
      .then((res) => {
        if (res.data.res) {
          resolve(JSON.parse(res.data.bookshelf));
        } else {
          ElNotification({ title: '获取网上书架失败。', message: res.data.context, type: 'warning', duration: 3000 });
          reject('失败。');
        }
      })
      .catch((err) => {
        ElNotification({ message: '获取网上书架失败。', type: 'warning', duration: 3000 });
        console.log('ERROR => ', err);
        reject('失败。');
      });
  });

}

var updataNetBookshelf = (userId) => {
  axios
    .post("/api/updatebookshelf", {
      id: userId,
      bookshelf: localStorage.bookshelf,
    })
    .catch((err) => {
      console.log('ERROR => 同步网上书架失败！');
    })
}

export const updataBookShelf = (bookId, catalogue) => {
  let localBookShelf = JSON.parse(localStorage.bookshelf);
  if (!localBookShelf[bookId]) { return }
  localBookShelf[bookId]["catalogue_id"] = catalogue.catalogue_id;
  localBookShelf[bookId]["catalogue_name"] = catalogue.catalogue_name;
  localStorage.bookshelf = JSON.stringify(localBookShelf);
  let user = getUser();
  if (user) {
    updataNetBookshelf(user.id);
  }
  return localBookShelf
}

export const fromBookshelfDelBook = (bookId) => {
  let localBookShelf = JSON.parse(localStorage.bookshelf);
  if (!localBookShelf[bookId]) { return }
  delete localBookShelf[bookId];
  localStorage.bookshelf = JSON.stringify(localBookShelf);
  let user = getUser();
  if (user) {
    updataNetBookshelf(user.id);
  }
  return localBookShelf
}

export const addBookToBookshelf = (book) => {
  let localBookShelf = JSON.parse(localStorage.bookshelf);
  if (localBookShelf[book.book_id]) {
    ElNotification({ message: '书籍已经加入书架了！', type: 'info', duration: 1200 });
    return
  }
  localBookShelf[book.book_id] = book;
  localStorage.bookshelf = JSON.stringify(localBookShelf);
  ElNotification({ message: '加入书架成功！', type: 'success', duration: 1200 });
  let user = getUser();
  if (user) {
    updataNetBookshelf(user.id);
  }
  return localBookShelf
}
