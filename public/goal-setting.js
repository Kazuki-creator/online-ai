/**
 * Webアプリとして公開する場合のエントリポイント。
 * doGet() で goal-setting_prompt.html を返す例です。
 */
function doGet(e) {
  // URLパラメータに応じた処理を追加可能
  return HtmlService.createHtmlOutputFromFile('goal-setting_prompt');
}

/**
 * ユーザーが入力した目標情報を処理してスプレッドシートに保存する関数。
 * クライアントからのPOSTリクエストで呼び出すことを想定。
 */
function processGoalSetting(data) {
  // data.goal にユーザーの入力した目標情報があるとする
  var goal = data.goal;
  if (!goal) {
    return { status: 'error', message: '目標情報が空です' };
  }
  
  // 対象のスプレッドシートを取得（IDは直接指定するか、PropertiesServiceで管理）
  var ss = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID'); // ※環境に合わせて変更
  var sheetName = 'GoalSetting';
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    // シートが存在しない場合は新規作成し、1行目にヘッダーを設定
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(['Timestamp', 'Goal']);
  }
  
  // 現在の日時と目標情報を新規行に追加
  sheet.appendRow([new Date(), goal]);
  
  return { status: 'success', message: '目標が保存されました' };
}
