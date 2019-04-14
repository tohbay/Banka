import transactions from '../../db/transactions';
import TransactionService from '../models/transaction';


class TransactionController {
  static fetchAll(request, response) {
    const transactionRecords = TransactionService.getAll(transactions);
    if (transactionRecords.length === 0) return response.status(200).json({ status: 404, message: 'There are no transaction records' });
    return response.status(200).json({
      status: 200,
      message: 'All Transactions retrieved successfully',
      data: transactionRecords
    });
  }
}

export default TransactionController;
