## ⚠️ 배포 안내
현재 이 Repository에 올라가 있는 폰트는 웹 폰트로서 사용하기 위해 변환된 파일입니다.

라이센스는 [공식 웹사이트](https://freesentation.blog/#license)에서 확인하실 수 있습니다.<br /><br />

## 웹폰트

모든 기능을 포함한 (압축되지 않은) 웹폰트를 사용하려면 아래 코드를 사용하세요. 사용하는 font-family 이름은 `Freesentation` 입니다.

#### HTML

```html
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/ayaan-fonts/Freesentation@1.x/fonts/webfonts/Freesentation.css" />
```

#### CSS

```css
@import url("https://cdn.jsdelivr.net/gh/ayaan-fonts/Freesentation/fonts/webfonts/Freesentation.css");
```

---

### 경량 서브셋

웹폰트 용량으로 인해 로딩이 지연되거나, FOUC 문제가 발생하는 경우를 해결하기 위한 방법으로, 일부 주요 사용되는 문자만 다운로드 하여 이용하실 수 있는 서브셋을 제공합니다. 사용하는 font-family 이름은 `Freesentation` 입니다.

#### HTML

```html
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/ayaan-fonts/Freesentation@1.x/fonts/webfonts/Freesentation-dynamic-subset.css" />
```

#### CSS

```css
@import url("https://cdn.jsdelivr.net/gh/ayaan-fonts/Freesentation/fonts/webfonts/Freesentation-dynamic-subset.css");
```

---

### 다이나믹 서브셋

웹폰트 용량으로 인해 로딩이 지연되거나, FOUC 문제가 발생하는 경우, 특히 위 서브셋으로 해결되지 못하는 경우를 위한 방법으로 Google Fonts에서 제공하는 한글 글꼴과 동일한 방식으로 동적 서브셋을 제공합니다.

페이지에 포함된 글자만 선택적으로 다운로드하여 이용하는 방식으로 사용하실 수 있습니다. 사용하는 font-family 이름은 `Freesentation` 입니다.

#### HTML

```html
<link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/ayaan-fonts/Freesentation@1.x/fonts/webfonts/Freesentation-dynamic-subset.css" />
```

#### CSS

```css
@import url("https://cdn.jsdelivr.net/gh/ayaan-fonts/Freesentation/fonts/webfonts/Freesentation-dynamic-subset.css");
```
