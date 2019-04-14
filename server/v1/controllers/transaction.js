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

  static fetchSpecificTransaction(request, response) {
    const { id } = request.params;
    const specificTransactionRecord = TransactionService.getOne(Number(id));
    if (!specificTransactionRecord) return response.status(200).json({ status: 404, message: 'Transaction with given Id does not exist' });
    return response.status(200).json({
      status: 200,
      message: 'All Transactions retrieved successfully',
      data: specificTransactionRecord
    });
  }
}

export default TransactionController;
