/**
 * Event specification
 */
type RqrsEventSpec = { 
  type: string,
  request: any,
  response: any
};

/**
 * Request-response event emitter
 */
declare class RqrsEmitter<T extends RqrsEventSpec> {
  //
  // Request-response methods
  //
  
  /**
   * Send new request
   * @param event - Event name
   * @param data - Request data
   */
  public request<E extends T>(event: E['type'], data: E['request']): E['response'];

  /**
   * Add request handler
   * @param event - Event name
   * @param handlerFn - Request handler function (must be async)
   */
  public addRequestHandler<E extends T>(event: E['type'], handlerFn: (req: E['request']) => E['response']): this;
  public handler<E extends T>(event: E['type'], handlerFn: (req: E['request']) => E['response']): this;

  /**
   * Remove request handler
   * @param event - Event name
   */
  public removeRequestHandler<E extends T>(event: E['type']): this;
  public removeHandler<E extends T>(event: E['type']): this;

  //
  // Event emitter methods, from EventEmitter3
  //

  /**
   * Return the number of listeners listening to a given event.
   */
  public listenerCount<E extends T>(event: E['type']): number;

  /**
   * Send out given event.
   */
  public emit<E extends T>(event: E['type'], data: E['request']): boolean;

  /**
   * Add a listener for a given event.
   */
  public addListener<E extends T>(event: E['type'], fn: (req: E['request']) => any, context?: any): this;
  public on<E extends T>(event: E['type'], fn: (req: E['request']) => any, context?: any): this;

	/**
   * Add a one-time listener for a given event.
   */
  public once<E extends T>(event: E['type'], fn: (req: E['request']) => any, context?: any): this;

	/**
   * Remove the listeners of a given event.
   */
  public removeListener<E extends T>(event: E['type'], fn?: (req: E['request']) => any, context?: any, once?: boolean): this;
  public off<E extends T>(event: E['type'], fn?: (req: E['request']) => any, context?: any, once?: boolean): this;
}

// Export class
export default RqrsEmitter;
